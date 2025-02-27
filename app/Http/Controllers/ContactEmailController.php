<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactEmailController extends Controller
{
    public function sendContactEmail(Request $request)
    {
        // $id = $request->user()->id;

        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string',
        //     'phone' => 'required|string',
        //     'message' => 'required|string',
        // ]);

        // $customerEmail = Customer::find($id)->email;

        // $message = htmlspecialchars($request->message, ENT_QUOTES, 'UTF-8');

        // $name = $request->input('name');
        // $email = $request->input('email');
        // $phone = $request->input('phone');
        // $message = $request->input('message');
        // // $message = $request->message;
        // $recipient1 = 'rehanmohammad.work@gmail.com'; // You can modify this to be dynamic

        // Mail::to($recipient1)->send(new ContactMail($name, $email, $phone, $message));

        // return response()->json(['message' => 'Email sent successfully']);

        $id = $request->user()->id;

        $customerEmail = Customer::find($id)->email;

        $emailHtml = $request->input('emailHtml');
        $name = $request->name;
        $email = $request->email;
        $phone = $request->phone;
        $recipient1 = 'tasneem@alyko.com'; // You can modify this to be dynamic
        // $recipient2 = $customerEmail; // You can modify this to be dynamic

        // return [
        //     'emailHtml' => $emailHtml,
        //     'name' => $name,
        //     'email' => $email,
        //     'phone' => $phone,
        // ];

        Mail::to([$recipient1])->send(new ContactMail($emailHtml, $name, $email, $phone));

        return response()->json(['message' => 'Email sent successfully', 'customerEmail' => $customerEmail]);
    }
}
