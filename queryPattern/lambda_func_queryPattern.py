import csv
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Get the bucket and object key from the event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']
    
    # Read the contents of the S3 object
    response = s3.get_object(Bucket=bucket_name, Key=object_key)
    contents = response['Body'].read().decode('utf-8')
    
    # Parse the CSV file and extract the second row
    rows = csv.reader(contents.split('\n'))
    header = next(rows) # skip header row
    second_row = next(rows)
    value1, value2 = second_row
    value1 = int(value1)
    print("VALUE1 = ", value1)
    value2 = float(value2)
    value3 = None
    value4 = ""
    if value1 == 1:
        value3 = value2 / 2.54
        value4 = "inches (Height)"
    elif value1 == 2:
        value3 = value2 + 10
        value4 = "BPM"
    elif value1 == 3:
        value4 = ": Cholestrol"
        if value2 > 180:
            value3 = "BAD"
        else:
            value3 = "GOOD" 
    # Read the existing CSV file in the destination bucket
    destination_bucket = 'destination-querybucket'
    destination_key = 'destination_csvfile.csv'
    response = s3.get_object(Bucket=destination_bucket, Key=destination_key)
    existing_contents = response['Body'].read().decode('utf-8')

        
    
    # Append the new values to the existing CSV file
    new_row = f"{value1},{value2},{value3},{value4}\n"
    updated_contents = existing_contents + new_row
    
    # Upload the updated CSV file to the destination bucket
    s3.put_object(Bucket=destination_bucket, Key=destination_key, Body=updated_contents)
    
    return {
        'statusCode': 200,
        'body': 'File uploaded successfully'
    }
