from boto3 import client
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os

load_dotenv()

s3_client = client(
    "s3",
    aws_access_key_id=os.getenv("ACCESS_KEY"),
    aws_secret_access_key=os.getenv("SECRET_KEY"),
)
BUCKET_NAME = os.getenv("BUCKET_NAME", "alvin-sih-bucket")


def upload_file(file, object_name):
    try:
        s3_client.upload_fileobj(file, BUCKET_NAME, object_name)
    except ClientError as e:
        return False
    return True


def get_file(object_name):
    file = s3_client.get_object(Bucket=BUCKET_NAME, Key=object_name)
    return file["Body"].read()


def delete_file(object_name):
    try:
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=object_name)
    except ClientError as e:
        return False
    return True


def list_files():
    print(BUCKET_NAME)
    files = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
    return [file["Key"] for file in files.get("Contents", [])]


if __name__ == "__main__":
    print(list_files())
    print(upload_file(open("main.py", "rb"), "main.py"))
    print(list_files())
    print(get_file("main.py"))
    print(delete_file("main.py"))
    print(list_files())
