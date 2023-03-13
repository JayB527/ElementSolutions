import json
import os
import csv
import boto3
from datetime import datetime

# Create a CSV file



# Upload the CSV file to an S3 bucket

session = boto3.Session(
aws_access_key_id='',
aws_secret_access_key='',
region_name='us-west-1')

s3 = session.client('s3')
# Run the command and capture the output

def search_resources_get(
    project_id,
    location,
    dataset_id,
    fhir_store_id,
    resource_type,
):
    """
    Uses the searchResources GET method to search for resources in the given FHIR store.

    See https://github.com/GoogleCloudPlatform/python-docs-samples/tree/main/healthcare/api-client/v1/fhir
    before running the sample."""
    # Imports Python's built-in "os" module
    import os

    # Imports the google.auth.transport.requests transport
    from google.auth.transport import requests

    # Imports a module to allow authentication using a service account
    from google.oauth2 import service_account

    #os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/demo/keyfile.json"
    # Gets credentials from the environment.
    key_path = 'involuted-woods-360619-7bab2484edee.json'
    credentials = service_account.Credentials.from_service_account_file(
        key_path
    )
    scoped_credentials = credentials.with_scopes(
        ["https://www.googleapis.com/auth/cloud-platform"]
    )
    # Creates a requests Session object with the credentials.
    session = requests.AuthorizedSession(scoped_credentials)

    # URL to the Cloud Healthcare API endpoint and version
    base_url = "https://healthcare.googleapis.com/v1"

    # TODO(developer): Uncomment these lines and replace with your values.
    project_id = 'involuted-woods-360619'  # replace with your GCP project ID
    location = 'us-west1'  # replace with the parent dataset's location
    dataset_id = 'mydataset_fhir'  # replace with the parent dataset's ID
    fhir_store_id = 'mystore_fhir1' # replace with the FHIR store ID
    resource_type = resource_type  # replace with the FHIR resource type
    url = "{}/projects/{}/locations/{}".format(base_url, project_id, location)

    resource_path = "{}/datasets/{}/fhirStores/{}/fhir/{}".format(
        url, dataset_id, fhir_store_id, resource_type
    )

    response = session.get(resource_path)
    response.raise_for_status()

    resources = response.json()

    #print("Using GET request, found a total of {} {} resources:".format(resources["total"], resource_type))
    #print(json.dumps(resources, indent=2))

    return resources



name = input("Enter your name: ")
print("Hello "+name)

print("1. Height\n 2. Glucose\n 3. Cholestrol")
query_var = int(input("Enter query to run: \n"))

result1 = search_resources_get(1,1,1,1,"Observation?code=8302-2")
result2 = search_resources_get(1,1,1,1,"Observation?code=2339-0")
result3 = search_resources_get(1,1,1,1,"Observation?code=2093-3")
r1,r2,r3 = True,True,True

#print("Look HEREEE!:::\n\n")
#print(result1['entry'][0])
#print(result2)
#print(result3)
"""
coding_list = result1['entry'][0]['resource']['category'][0]['coding']
for coding in coding_list:
    if coding['system'] == 'http://terminology.hl7.org/CodeSystem/observation-category':
        display1 = coding['display']
unit1 = result1['entry'][0]['resource']['valueQuantity']['unit']

"""
        


#This function will take entire response (FHIR resource) and also the expected parameter name(text), expected unit, expected display name.
#It will then match the expected values with the actual values in the FHIR resource.
#If any of the expected values do not match with the actual values in the resource: that parameter cannot be calculated.
def data_validation(result, text, unit,display):
    data_validation_text = {1: "Name in 'text' is incorrect", 2: "Unit is invalid", 3: "Display sign in invalid"}
    coding_list = result1['entry'][0]['resource']['category'][0]['coding']
    for coding in coding_list:
        if coding['system'] == 'http://terminology.hl7.org/CodeSystem/observation-category':
            display1 = coding['display']

    r1 = True
    #print(result['entry'][0]['resource']['code']['text'],text)
    #print(result['entry'][0]['resource']['valueQuantity']['unit'],unit)
    #print(display1,display)
    

    if result['entry'][0]['resource']['code']['text'] != text:
        print(text," : ",data_validation_text[1])
        r1 = False
    if result['entry'][0]['resource']['valueQuantity']['unit'] != unit: 
        print(text," : ",data_validation_text[2])
        r1 = False
    if display1 != display:
        print(text," : ",data_validation_text[3])
        r1 = False
    if not r1:
        print(text, " cannot be calculated")
    
    return r1
    
r1 = data_validation(result1, 'Body Height', 'cm', 'vital-signs')
r2 = data_validation(result2, 'Glucose', 'mg/dL', 'vital-signs')

#Deliberate mistake in 2nd parameter 'text'. This results in an error that tells us that the dependency for Cholestrol is not satisfied, hence it cannot be calculated.
r3 = data_validation(result3, 'Total Cholesterol', 'mg/dL', 'vital-signs')

if r1:
    if query_var == 1:

        #result = search_resources_get(1,1,1,1,"Observation?code=8302-2")
        Heightval = result1['entry'][0]['resource']['valueQuantity']['value']
        data = [("query_selected", "Height Value"), (1, Heightval)]

        #print(json.dumps(result, indent=2))
    
        with open('example_Height.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)

        now = datetime.now()
        #print("now =", now)    
        bucket_name = 'querypatternbucket'
        file_name = 'example_Height.csv'
        object_key = 'example_Height.csv'

        with open(file_name, 'rb') as file:
            s3.upload_fileobj(file, bucket_name, object_key)
        print("Body Height Calculated.")
#else:
    #print("Height cannot be calculated")

if r2: 
    if query_var == 2:

        #result = search_resources_get(1,1,1,1,"Observation?code=55284-4")
        BPval = result2['entry'][0]['resource']['valueQuantity']['value']
        data = [("query_selected", "Glucose Value"), (2, BPval)]
        #print(json.dumps(result, indent=2))
    
        with open('example_BP.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)
        
        now = datetime.now()
        #print("now =", now)    
        bucket_name = 'querypatternbucket'
        file_name = 'example_BP.csv'
        object_key = 'example_BP.csv'

        with open(file_name, 'rb') as file:
            s3.upload_fileobj(file, bucket_name, object_key)
        print("Glucose Calculated.")
#else:
 #   print("Glucose cannot be calculated")

if r3: 
    if query_var == 3:

        #result = search_resources_get(1,1,1,1,"Observation?code=2093-3")
        CHval = result3['entry'][0]['resource']['valueQuantity']['value']
        data = [("query_selected", "Cholestrol Value"), (3, CHval)]
        #print(json.dumps(result, indent=2))
    
        with open('example_cholestrol.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)
        
        now = datetime.now()
        #print("now =", now)    
        bucket_name = 'querypatternbucket'
        file_name = 'example_cholestrol.csv'
        object_key = 'example_cholestrol.csv'

        with open(file_name, 'rb') as file:
            s3.upload_fileobj(file, bucket_name, object_key)
        print("Total Cholestrol Calculated.")

#else:
 #   print("Cholestrol cannot be calculated.")
    