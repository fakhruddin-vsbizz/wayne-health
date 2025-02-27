<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string'],
            'fax' => ['nullable', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:' . Customer::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . Customer::class],
            'password' => ['required'],
            'address_line_1' => ['required', 'string'],
            'address_line_2' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'state' => ['nullable', 'string'],
            'postal_code' => ['nullable', 'string', 'max:10'],
            'country' => ['nullable', 'string'],
        ]);

        $address['ship_to_name'] = $request->first_name . " " . $request->last_name;
        $address['ship_to_company'] = $request->company_name;
        $address['address_line_1'] = $request->address_line_1;
        $address['address_line_2'] = $request->address_line_2;
        $address['city'] = $request->city;
        $address['state'] = $request->state;
        $address['postal_code'] = $request->postal_code;
        $address['country'] = $request->country;
        $address['is_default'] = "on";

        $user = Customer::create($fields);

        $user->address()->create($address);

        $token = $user->createToken($request->username);

        return [
            'user' => $user,
            'token' => $token->plainTextToken,
        ];
    }

    public function registerMultipleCustomers(Request $request)
    {
        // Validate the request to ensure it is an array of customers
        $request->validate([
            'customers' => 'required|array',
            'customers.*.first_name' => ['required', 'string', 'max:255'],
            'customers.*.last_name' => ['required', 'string', 'max:255'],
            'customers.*.company_name' => ['nullable', 'string', 'max:255'],
            'customers.*.phone' => ['nullable', 'string'],
            'customers.*.fax' => ['nullable', 'string', 'max:255'],
            'customers.*.username' => ['required', 'string', 'max:255', 'unique:' . Customer::class],
            'customers.*.email' => ['required', 'string', 'email', 'max:255', 'unique:' . Customer::class],
            'customers.*.password' => ['required'],
            'customers.*.address_line_1' => ['required', 'string'],
            'customers.*.address_line_2' => ['nullable', 'string'],
            'customers.*.city' => ['nullable', 'string'],
            'customers.*.state' => ['nullable', 'string'],
            'customers.*.postal_code' => ['nullable'],
            'customers.*.country' => ['nullable', 'string'],
        ]);

        // Get the customer data from the request
        $customers = $request->input('customers');

        // Initialize an array to store the customer objects for bulk creation
        $createdCustomers = [];

        foreach ($customers as $customerData) {
            // Prepare the customer fields for insertion
            $fields = [
                'first_name' => $customerData['first_name'],
                'last_name' => $customerData['last_name'],
                'company_name' => $customerData['company_name'],
                'phone' => $customerData['phone'],
                'fax' => $customerData['fax'],
                'username' => $customerData['username'],
                'email' => strtolower($customerData['email']), // Ensure the email is lowercase
                'password' => bcrypt($customerData['password']),
                'address_line_1' => $customerData['address_line_1'],
                'address_line_2' => $customerData['address_line_2'],
                'city' => $customerData['city'],
                'state' => $customerData['state'],
                'postal_code' => $customerData['postal_code'],
                'country' => $customerData['country'],
            ];

            // Create the customer
            $customer = Customer::create($fields);

            // Prepare the address data
            $address = [
                'ship_to_name' => $customerData['first_name'] . " " . $customerData['last_name'],
                'ship_to_company' => $customerData['company_name'],
                'address_line_1' => $customerData['address_line_1'],
                'address_line_2' => $customerData['address_line_2'],
                'city' => $customerData['city'],
                'state' => $customerData['state'],
                'postal_code' => $customerData['postal_code'],
                'country' => $customerData['country'],
                'is_default' => 'on', // Set default address flag to 'on'
            ];

            // Create the customer address
            $customer->address()->create($address);

            // Create the token for the customer
            $token = $customer->createToken($customerData['username']);

            // Store the created customer along with their token
            $createdCustomers[] = [
                'user' => $customer,
                'token' => $token->plainTextToken,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Customers registered successfully',
            'customers' => $createdCustomers,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255', 'exists:' . Customer::class],
            'password' => ['required'],
        ]);

        $user = Customer::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'Invalid credentials',
            ];
        }

        $token = $user->createToken($user->username);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    /**
     * Display the specified resource.
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'success' => 'You are logged out.'
        ];
    }

    // public function tokenTest(Request $request)
    // {
    //     $user = $request->user();
    //     // $user = Customer::findOrFail($userId);
    //     return [
    //         'user' => $user,
    //     ];
    // }
}
