import os
import json
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

ses = boto3.client('ses')

def contact_us_handler(event, context):
    try:

        body = json.loads(event['body'])
        email = body.get('email')
        message = body.get('message')
        name = body.get('name')
        company = body.get('company')
        phone = body.get('phone')

        # Uncomment if needed to check cloudwatch logs
        # logger.info("Event received: %s", event)
        # logger.info("Email: %s, Message: %s", email, message)

        ses_from = os.environ['SES_FROM_ADDRESS']
        ses_to = os.environ['SES_TO_ADDRESS']
        # Uncomment if needed to check cloudwatch logs
        # logger.info("Sender (SES_FROM_ADDRESS) is %s", ses_from)
        # logger.info("Receiver (SES_TO_ADDRESS) is %s", ses_to)

        sender = f'"Contact Notifier" <{ses_from}>'
        # Uncomment if needed to check cloudwatch logs
        # logger.info ("Friendly sender is %s", sender)

        response = ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [ses_to]},
            Message={
                'Subject': {'Data': 'New Contact Us Submission'},
                'Body': {
                    'Text': {
                        'Data': f"Name: {name}\nCompany: {company}\nEmail: {email}\nPhone: {phone}\n\nMessage: {message}"
                    }
                }
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'message': 'Message sent'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'error': str(e)})
        }
