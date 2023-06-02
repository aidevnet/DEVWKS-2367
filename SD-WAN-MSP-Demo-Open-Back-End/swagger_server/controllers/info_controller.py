import connexion
import six
import sys

from swagger_server.models.create_tenant import CreateTenant  # noqa: E501
from swagger_server import util

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

import os
import requests
import json

class rest_api_lib:
    def __init__(self, vmanage_ip, username, password, port):
        self.vmanage_ip = vmanage_ip
        self.port = port
        self.session = {}
        self.login(self.vmanage_ip, username, password, port)

    def login(self, vmanage_ip, username, password, port):
        """Login to vmanage"""
        base_url_str = 'https://%s:%s'%(vmanage_ip, port)

        login_action = '/j_security_check'

        #Format data for loginForm
        login_data = {'j_username' : username, 'j_password' : password}

        #Url for posting login data
        login_url = base_url_str + login_action

        sess = requests.session()
        #If the vmanage has a certificate signed by a trusted authority change verify to True

        try:
            login_response = sess.post(url=login_url, data=login_data, timeout=10, verify=False)
            print(login_response)
        except:
            print("Couldn't connect to host.")
            raise ConnectionRefusedError("Couldn't connect to host.")

        if b'<' in login_response.content:
            print("Established connection to host but couldn't pass vManage security check.")
            raise ConnectionError("Established connection to host but couldn't pass vManage security check.")

        self.session[vmanage_ip] = sess

    def get_request(self, mount_point):
        """GET request"""
        url = "https://%s:%s/dataservice/%s"%(self.vmanage_ip, self.port, mount_point)
        #print url
        response = self.session[self.vmanage_ip].get(url, verify=False)
        data = response.content
        return data

    def post_request(self, mount_point, payload, headers={'Content-Type': 'application/json'}):
        """POST request"""
        url = "https://%s:%s/dataservice/%s"%(self.vmanage_ip, self.port, mount_point)
        payload = json.dumps(payload)
        print (payload)

        response = self.session[self.vmanage_ip].post(url=url, data=payload, headers=headers, verify=False)
        data = response.json()
        return data

def get_tenants():  # noqa: E501
    """Retrieve a list of tenants

     # noqa: E501

    :rtype: Tenant
    """
    try:
        with open('/usr/src/app/swagger_server/controllers/tenants.json') as f:
            data = json.load(f)
    except:
        print("Unexpected error:", sys.exc_info()[0])
    return data

def vsmarts_status():

    try:
        with open('/usr/src/app/swagger_server/controllers/tenants.json') as f:
            results = json.load(f)
    except:
        print("Unexpected error:", sys.exc_info()[0])

    #items = result['data']

    vsmarts = []
    for result in results:
        sdwanp = rest_api_lib(result['vmanageIp'], result['vmanageUsername'], result['vmanagePassword'], result['port'])

        responses = json.loads(sdwanp.get_request('device/status'))['data']

        v = {
            "vmanageIp": result['vmanageIp'],
            "data": [
                {
                "type": responses[0]['type'],
                "name": responses[0]['name'],
                "count": responses[0]['count'],
                "error": responses[0]['statusList'][0]['count'],
                "warning": responses[0]['statusList'][1]['count'],
                "normal": responses[0]['statusList'][2]['count'],
                "new": responses[0]['statusList'][3]['count']
                }
            ]
        }
        vsmarts.append(v)

    return vsmarts

def vedges_status():

    try:
        with open('/usr/src/app/swagger_server/controllers/tenants.json') as f:
            results = json.load(f)
    except:
        print("Unexpected error:", sys.exc_info()[0])

    #items = result['data']

    vedges = []
    for result in results:
        sdwanp = rest_api_lib(result['vmanageIp'], result['vmanageUsername'], result['vmanagePassword'], result['port'])

        responses = json.loads(sdwanp.get_request('device/hardwarehealth/summary'))['data']

        e = {
            "vmanageIp": result['vmanageIp'],
            "data": [
                {
                "name": responses[0]['name'],
                "count": responses[0]['count'],
                "error": responses[0]['statusList'][2]['count'],
                "warning": responses[0]['statusList'][1]['count'],
                "normal": responses[0]['statusList'][0]['count']
                }
            ]
        }
        vedges.append(e)

    return vedges

def control_status():

    try:
        with open('/usr/src/app/swagger_server/controllers/tenants.json') as f:
            results = json.load(f)
    except:
        print("Unexpected error:", sys.exc_info()[0])

    #items = result['data']

    control = []
    for result in results:
        sdwanp = rest_api_lib(result['vmanageIp'], result['vmanageUsername'], result['vmanagePassword'], result['port'])

        responses = json.loads(sdwanp.get_request('device/counters'))['data']

        for response in responses:
            try:
                c = {
                    "vmanageIp": result['vmanageIp'],
                    "system-ip": response['system-ip'],
                    "vsmart-control-connections": response['number-vsmart-control-connections'],
                    "expected-control-connections": response['expectedControlConnections'],
                    "rebootCount": response['rebootCount'],
                    "crashCount": response['crashCount']
                    }
            except KeyError:
                continue
            control.append(c)

    return control

def site_health():
    try:
        with open('/usr/src/app/swagger_server/controllers/tenants.json') as f:
            results = json.load(f)
    except:
        print("Unexpected error:", sys.exc_info()[0])

    #items = result['data']

    site = []
    for result in results:
        sdwanp = rest_api_lib(result['vmanageIp'], result['vmanageUsername'], result['vmanagePassword'], result['port'])

        responses = json.loads(sdwanp.get_request('device'))['data']

        for response in responses:
            if response['device-type'] == "vedge":
                s = {
                    "vmanageIp": result['vmanageIp'],
                    "system-ip": response['system-ip'],
                    "deviceId": response['deviceId'],
                    "hostname": response['host-name'],
                    "reachability": response['reachability'],
                    "status": response['status'],
                    "personality": response['personality'],
                    "bfdSessionsUp": response['bfdSessionsUp'],
                    "bfdSessions": response['bfdSessions']
                    }
                site.append(s)

    return site

def append_to_json(filepath, data):
    """
    Append data in JSON format to the end of a JSON file.
    NOTE: Assumes file contains a JSON object (like a Python
    dict) ending in '}'. 
    :param filepath: path to file
    :param data: dict to append
    """

    # construct JSON fragment as new file ending
    new_ending = ", " + "{"+ json.dumps(data)[1:-1] + "}\n" + "]"

    # edit the file in situ - first open it in read/write mode
    with open(filepath, 'r+') as f:

        f.seek(0, 2)        # move to end of file
        index = f.tell()    # find index of last byte

        # walking back from the end of file, find the index 
        # of the original JSON's closing '}'
        while not f.read().startswith(']'):
            index -= 1
            if index == 0:
                raise ValueError("can't find JSON object in {!r}".format(filepath))
            f.seek(index)

        # starting at the original ending } position, write out
        # the new ending
        f.seek(index)
        f.write(new_ending)

def create_tenant(body):
    if connexion.request.is_json:
        body = CreateTenant.from_dict(connexion.request.get_json())  # noqa: E501

    tenantName = body.tenantName
    vmanageIp = body.vmanageIp
    vmanagePassword = body.vmanagePassword
    vmanageUsername = body.vmanageUsername
    port = body.port

    try:
        sdwanp = rest_api_lib(vmanageIp, vmanageUsername, vmanagePassword, port)

        payload = {
            "tenantName":str(tenantName),
            "vmanageIp":str(vmanageIp),
            "vmanagePassword":str(vmanagePassword),
            "vmanageUsername":str(vmanageUsername),
            "port":str(port)
        }

        append_to_json('/usr/src/app/swagger_server/controllers/tenants.json', payload)
    except ConnectionRefusedError:
        return json.dumps({"error": "Couldn't connect to host."})
    except ConnectionError:
        return json.dumps({"error": "Established connection to host but couldn't pass vManage security check."})
