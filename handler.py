import json
import boto3
import logging

def publish_to_sns(message):
    sns = boto3.client('sns')
    return sns.publish(
        TopicArn='arn:aws:sns:eu-west-1:769403605349:SendReportTopic',
        Message=message,
        MessageStructure='string',
        MessageAttributes={
            'summary': {
                'StringValue': 'just a summary',
                'DataType': 'String'
            }
        }
    )


def add_report(event, context):
    # decide when the function should begin to send SNS message and leave
    threshold_millis = 10 * 1000  # leave when there are only 10 seconds left

    report = json.loads(event['body'])
    reports_table = boto3.resource('dynamodb').Table('reports')
    response = reports_table.put_item(Item=report)

    # check remain time by accessing context object
    remain_millis = context.get_remaining_time_in_millis()
    if remain_millis < threshold_millis:
        publish_to_sns(report['message'])

    body = {
        "response": response
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(response)
    }

    return response
