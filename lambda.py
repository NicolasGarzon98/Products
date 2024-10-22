import json
import boto3
from botocore.exceptions import ClientError

# Inicializa el cliente de DynamoDB
dynamodb = boto3.resource('dynamodb')
tabla = dynamodb.Table('ProductDB')

def lambda_handler(event, context):
    # Extraer datos del evento (por ejemplo, un JSON)
    try:
        # Suponiendo que el evento contiene un objeto JSON con los datos
        item = {
            'ID': event['id'],  # Asegúrate de que 'id' esté presente en el evento
            'Nombre': event['nombre'],
            'Descripcion': event['descripcion']
        }

        # Inserta el elemento en la tabla
        respuesta = tabla.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': json.dumps('Elemento agregado exitosamente!')
        }

    except ClientError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f"Error al agregar el elemento: {e.response['Error']['Message']}")
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Ocurrió un error: {str(e)}")
        }
