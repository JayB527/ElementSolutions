import google.auth
from google.cloud import dlp_v2
from google.cloud.dlp_v2.types import DeidentifyTemplate
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(r'/Users/ankithb/Downloads/ElementSolutions/involuted-woods-360619-59d8e0b17cdb.json')
project_id = credentials.project_id

dlp = dlp_v2.DlpServiceClient(credentials=credentials)

# Define the de-identification profile
deid_config = {
    "info_type_transformations": {
        "transformations": [
            {
                "info_types": [
                    {"name": "FIRST_NAME"},
                    {"name": "LAST_NAME"}
                ],
                "primitive_transformation": {
                    "redact_config": {
                    }
                }
            },

            {
                "info_types": [
                    {"name": "PHONE_NUMBER"},
                    {"name": "EMAIL_ADDRESS"}
                ],
                "primitive_transformation": {
                    "character_mask_config": {
                        "masking_character": "*",
                    }
                }
            },
            {
                "info_types": [
                    {"name": "DATE_OF_BIRTH"}
                ],
                "primitive_transformation": {
                    "date_shift_config": {
                        "lower_bound_days": -365,
                        "upper_bound_days": 365,
                    }
                }
            }
        ]
    }
}


deidentify_template_make = DeidentifyTemplate(
    name = "DeIdTest",
    display_name = "ProgramDeId",
    description = "Program Created Template",
    deidentify_config = deid_config
)

# Set the de-identification profile
response = dlp.create_deidentify_template(
    parent=f"projects/{project_id}",
    deidentify_template = deidentify_template_make
)
print(f"De-identification profile created: {response}")
