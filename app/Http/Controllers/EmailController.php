<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Customer;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendOrderConfirmationEmail(Request $request)
    {
        $id = $request->user()->id;

        $customerEmail = Customer::find($id)->email;

        $emailHtml = $request->input('emailHtml');
        $recipient1 = 'tasneemalyko@gmail.com'; // You can modify this to be dynamic
        $recipient2 = $customerEmail; // You can modify this to be dynamic

        Mail::to([$recipient1, $recipient2])->send(new OrderConfirmationMail($emailHtml));

        return response()->json(['message' => 'Email sent successfully', 'customerEmail' => $customerEmail]);
    }
}
