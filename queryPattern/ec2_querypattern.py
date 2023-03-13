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

    print(
        "Using GET request, found a total of {} {} resources:".format(
            resources["total"], resource_type
        )
    )
    print(json.dumps(resources, indent=2))

    return resources



name = input("Enter your name: ")
print("Hello "+name)

print("1. Height\n 2. Blood Pressure\n 3. Cholestrol")
query_var = int(input("Enter query to run: \n"))


if query_var == 1:


    result = search_resources_get(1,1,1,1,"Observation?code=8302-2")
    Heightval = result['entry'][0]['resource']['valueQuantity']['value']
    data = [("query_selected", "Height Value"), (1, Heightval)]
 
    with open('example_Height.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)

    now = datetime.now()
    print("now =", now)    
    bucket_name = 'querypatternbucket'
    file_name = 'example_Height.csv'
    object_key = 'example_Height.csv'

    with open(file_name, 'rb') as file:
        s3.upload_fileobj(file, bucket_name, object_key)



if query_var == 2:

    result = search_resources_get(1,1,1,1,"Observation?code=55284-4")
    BPval = result['entry'][0]['resource']['component'][0]['valueQuantity']['value']
    data = [("query_selected", "BP Value"), (2, BPval)]
 
    with open('example_BP.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)
    
    now = datetime.now()
    print("now =", now)    
    bucket_name = 'querypatternbucket'
    file_name = 'example_BP.csv'
    object_key = 'example_BP.csv'

    with open(file_name, 'rb') as file:
        s3.upload_fileobj(file, bucket_name, object_key)



if query_var == 3:

    result = search_resources_get(1,1,1,1,"Observation?code=2093-3")
    CHval = result['entry'][0]['resource']['valueQuantity']['value']
    data = [("query_selected", "Cholestrol Value"), (3, CHval)]
 
    with open('example_cholestrol.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)
    
    now = datetime.now()
    print("now =", now)    
    bucket_name = 'querypatternbucket'
    file_name = 'example_cholestrol.csv'
    object_key = 'example_cholestrol.csv'

    with open(file_name, 'rb') as file:
        s3.upload_fileobj(file, bucket_name, object_key)


    
