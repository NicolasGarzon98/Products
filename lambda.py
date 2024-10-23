import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ProductDB')

def lambda_handler(event, context):
    print("flag:", event)
    try:
        method = event['httpMethod']
    except KeyError:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Missing httpMethod'}),
            #'body': json.dumps({'message': event})
        }

    product_id = event.get('pathParameters', {}).get('id')
    
    if method == 'GET':
        if product_id:
            return get_product(product_id)
        else:
            return get_all_products()
    
    elif method == 'POST':
        return create_product(event)
    
    elif method == 'PUT':
        return update_product(product_id, event)
    
    elif method == 'DELETE':
        return delete_product(product_id)
    
    return {
        'statusCode': 400,
        'body': json.dumps({'message': 'Invalid request'})
    }

def get_product(product_id):
    try:
        response = table.get_item(Key={'id': product_id})
        product = response.get('Item')
        if product:
            return {'statusCode': 200, 'body': json.dumps([decimal_to_float(product)])}
        else:
            return {'statusCode': 404, 'body': json.dumps({'message': 'Product not found'})}
    except ClientError as e:
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}

def get_all_products():
    response = table.scan()
    products = response.get('Items', [])
    return {'statusCode': 200, 'body': json.dumps([decimal_to_float(product) for product in products])}

def create_product(event):
    #product_data = json.loads(event['body'])
    product_data = event['body']
    product_id = product_data['id']
    table.put_item(Item=product_data)
    return {'statusCode': 201, 'body': json.dumps({'message': 'Product created'})}

def update_product(product_id, event):
    product_data = json.loads(event['body'])
    table.update_item(
        Key={'id': product_id},
        UpdateExpression='SET #name = :name, #description = :description, #price = :price',
        ExpressionAttributeNames={
            '#name': 'name',
            '#description': 'description',
            '#price': 'price'
        },
        ExpressionAttributeValues={
            ':name': product_data['name'],
            ':description': product_data['description'],
            ':price': product_data['price']
        }
    )
    return {'statusCode': 200, 'body': json.dumps({'message': 'Product updated'})}

def delete_product(product_id):
    table.delete_item(Key={'id': product_id})
    return {'statusCode': 204}

def decimal_to_float(data):
    if isinstance(data, dict):
        return {k: decimal_to_float(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [decimal_to_float(i) for i in data]
    elif isinstance(data, Decimal):
        return float(data)
    return data