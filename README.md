# Mas Hospital Management System

## Sensitivity

- Api Endpoints

  - /sensitivity (GET to get all the sensitivity information)
  - /sensitivity (POST to create new Sensitivity) - Request Body

    ```{
       "value" :"SOmefeLLkj",
       "label": "string;,",
       "description": "string;",
       "result_option": [
       {
       "label":"something",
       "value":"someting"
       }
       ]
       }

    ```

  - /sensitivity (PATCH to update Sensitivity) - Request Body could be same as post
  - /sensitivity/ObjectId (DELETE Request to delete sensitivity)
