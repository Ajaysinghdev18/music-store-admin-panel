export const EmailTypes = [
    {
        displayText: 'Welcome Email After SignUp',
        value: 'user_welcome',
        info: 'This Template should Consist these Variables',
        variables: []
    },
    {
        displayText: 'Email Verification',
        value: 'email_verification',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {
        displayText: 'Welcome Artist Template',
        value: 'artist_welcome',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'Forget Password Email',
        value: 'Forget_Password',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'Order Confirmation',
        value: 'order_confirmation',
        info: 'This Template should Consist these Variables',
        variables: ['OrderDate', 'OrderTotal', 'Delivery']
    },
    {   
        displayText: 'New Smart Contract Email',
        value: 'new_smart_contract',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'KYC under verification Email',
        value: 'kyc_under_verification',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'KYC Rejected Email',
        value: 'kyc_rejected',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress', 'adminComment']
    },
    {   
        displayText: 'KYC Verified Email',
        value: 'kyc_verifed',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'New Gallery Email',
        value: 'new_gallery',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'New Product Email',
        value: 'new_product',
        info: 'This Template should Consist these Variables',
        variables: ['userName', 'emailAddress']
    },
    {   
        displayText: 'Purchase Order Confirmation Email',
        value: 'purchase_order_confirmation',
        info: 'This Template should Consist these Variables',
        variables: ['productName', 'emailAddress']
    }
];