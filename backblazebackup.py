id_and_key = '5b10e0ef9a9c:0017bad24626ae5c9867669454e19fdc7b6d3b2127'
        basic_auth_string = 'Basic ' + base64.b64encode(id_and_key)
        headers = { 'Authorization': basic_auth_string }
        b2request = urllib2.Request(
            'https://api.backblazeb2.com/b2api/v1/b2_authorize_account',
            headers = headers)
        response = urllib2.urlopen(b2request)
        response_data = json.loads(response.read())
        response.close()

        api_url = response_data['apiUrl']
        account_authorization_token = response_data['authorizationToken'] # Provided by b2_authorize_account
        bucket_id = 'b56b31b03e703e7f690a091c' # The ID of the bucket you want to upload your file to
        b2_url_request = urllib2.Request(
         '%s/b2api/v1/b2_get_upload_url' % api_url,
         json.dumps({ 'bucketId' : bucket_id }),
         headers = { 'Authorization': account_authorization_token }
         )
        response = urllib2.urlopen(b2_url_request)
        response_data = json.loads(response.read())
        response.close()

        upload_url = response_data['uploadUrl']
        upload_authorization_token = response_data['authorizationToken']
        file_data = cd['desktop_screenshot'].read()
        file_name =  force_text(cd['desktop_screenshot'].name, encoding='utf-8', strings_only=False, errors='strict')
        content_type = force_text(cd['desktop_screenshot'].content_type, encoding='utf-8', strings_only=False, errors='strict')
        sha1_of_file_data = hashlib.sha1(file_data).hexdigest()

        headers = {
            'Authorization' : upload_authorization_token,
            'X-Bz-File-Name' :  force_text(file_name, encoding='utf-8', strings_only=False, errors='strict'),
            'Content-Type' : force_text(content_type, encoding='utf-8', strings_only=False, errors='strict'),
            'X-Bz-Content-Sha1' : sha1_of_file_data
            }
        b2_upload_request = requests.post(upload_url, data=file_data, headers=headers)

        response_data = json.loads(b2_upload_request.content)
        response.close()

        success = response_data
