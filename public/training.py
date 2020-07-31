import os
from base64 import b64decode, b64encode, decodestring
from io import BytesIO
import cv2
import numpy as np
from cloudant import Cloudant, query
from PIL import Image
import faceRecognition as fr
import shutil
import sys

USERNAME = 'cad2e34d-a37b-4756-b137-caa6154debec-bluemix'
PASSWORD = '2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113'
URL = 'https://cad2e34d-a37b-4756-b137-caa6154debec-bluemix:2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113@cad2e34d-a37b-4756-b137-caa6154debec-bluemix.cloudantnosqldb.appdomain.cloud'
ACCOUNT_NAME='fab907e3-78f2-4d06-b635-15dad9373575-bluemix'
APIKEY='9pVwSZ47r8CHuRyEUOJrtyXas1sdQ-nKZ1O0pxaHL_R3'
#client = Cloudant(USERNAME, PASSWORD, url=URL)
client=Cloudant.iam(ACCOUNT_NAME,APIKEY,connect=True)
# Connect to the account
client.connect()
my_database = client['testdb']

fileId= sys.argv[2]
user=sys.argv[1]
print(user)
print(fileId)
file_name = fileId #get the id here
for document in my_database:
    if (document['_id'] == file_name): #get id and compare
        #print(document)
        file = document.get_attachment("pic1.png", attachment_type='binary')
        img_data=file
        stream = BytesIO(img_data)
        image = Image.open(stream).convert("RGB")
        stream.close()
image.save("pic1.png")

parent_dir="trainingImages/"
directory="0"
created=False
# path = os.path.join(parent_dir, directory)
while created == False:
    try:
        path = os.path.join(parent_dir, directory)
        os.mkdir(path)
        created=True
    except OSError as error:
        print(error)
        dic= int(directory)
        dic+=1
        directory=str(dic)
# folder is created in their as 0 1 2 ...


# moving the image file to that folder
path = os.path.join(parent_dir, directory)
#print(path)
destination= path
source="pic1.png"
shutil.move(source,destination)
faces,faceID=fr.labels_for_training_data('trainingImages')
face_recognizer=fr.train_classifier(faces,faceID)
face_recognizer.write('trainingData.yml')
print("folder:"+directory)
