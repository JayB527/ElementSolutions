import datetime
import time
import json
from google.cloud import dlp_v2
from googleapiclient import discovery
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(r'/Users/ankithb/Downloads/ElementSolutions/involuted-woods-360619-59d8e0b17cdb.json')
project_id = credentials.project_id

dlp = dlp_v2.DlpServiceClient(credentials=credentials)

api_version = "v1"
service_name = "healthcare"

# Load the de-identification profile
template_id = f"projects/{project_id}/deidentifyTemplates/5990703857419227562"

# Gets the template
deidentify_template = dlp.get_deidentify_template(name=template_id)


client = discovery.build(service_name, api_version, credentials = credentials)


# get the data from the fhir store
data_source_parent = "projects/{}/locations/{}/datasets/{}".format(
    project_id, "us-west1", "test-dataset-PF"
)
data_source_fhir = "{}/fhirStores/{}".format(data_source_parent, "synthea1")

# Send a search request to retrieve all resources in the store
fhir_resources = client.projects().locations().datasets().fhirStores().fhir().search(
    parent=data_source_fhir,
).execute()

# Convert to type item can use in de-identification template
json_data = json.dumps(fhir_resources)

# Specify the info types to search for that were included in the de identifcation template...
# probably a way to convert this so you don't have to manually input everything
info_types = [{"name": "FIRST_NAME"}, {"name": "LAST_NAME"}, {"name": "PHONE_NUMBER"},
              {"name": "EMAIL_ADDRESS"}, {"name": "DATE_OF_BIRTH"},]

# Create the InspectConfig object
inspect_config = {
    "info_types": info_types,
    "include_quote": True,
    "min_likelihood": dlp_v2.Likelihood.POSSIBLE,
}

response = dlp.deidentify_content(
    request={
        "parent": f"projects/{project_id}",
        "inspect_config": inspect_config,
        "deidentify_config": deidentify_template.deidentify_config,
        "item": {"value": json_data},
    }
)

#### Storing response of deidentified values into new data store dataset ####

destination_dataset_name = "projects/{}/locations/{}/datasets/{}".format(
    project_id, "us-west1", "DeIdentificationTesting"
)

destination_fhir_store_name = "{}/fhirStores/{}".format(
    destination_dataset_name, "UnIdentifiedData"
)


"""
# Set up a periodic job to repeat this process at 8 PM every day
while True:
    # Get the current time
    now = datetime.datetime.now()

    # If it's 8 PM, perform the de-identification and store in destination DB
    if now.hour == 20 and now.minute == 0:
        time.sleep(60)
"""
