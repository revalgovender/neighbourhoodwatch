import json
import boto3


def add_report(event, context):
    report = json.loads(event['body'])
    reports_table = boto3.resource('dynamodb').Table('reports')
    response = reports_table.put_item(Item=report)

    body = {
        "response": response
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(event)
    }

    return response
