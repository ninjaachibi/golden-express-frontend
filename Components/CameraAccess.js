import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

class CameraAccess extends React.Component {
  static navigationOptions = {
    title: 'Camera'
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: []
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

//   snap = async () => {             this is the boilerplate
//   if (this.camera) {
//     let photo = await this.camera.takePictureAsync();
//   }
// };

processText = img => {
  const body =
  {
  requests:[
  {
  image:{ content: img.base64, },
  features:[{"type":"DOCUMENT_TEXT_DETECTION","maxResults":5}]
  },],
  };
  fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDpxkjWTEFntmPwlLO1Ka0hBjrj2fukSxA", {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'image/jpeg',
      // "Authorization": "Bearer ya29.Glv4BWMGmNYmDIz8_MwA8JcmWqGJ2aKWJXYNF4anxgPsKskELaDuAlItSdcAqkGUmYyQyci_vUYbmRGSnvYaFzDERssouFzc2ejtrXKpz-u3guXb-eDVbF5jP3C-"
    },
    body: JSON.stringify(body)
  })

  .then(dataJson =>{
    //   let data = JSON.parse(dataJson);
    var data= JSON.parse(dataJson._bodyInit)
    data= data.responses
    // console.log('response0', data)

    // data.forEach( (obj) =>{
    //   responses.push(obj.description)
    // })
    var response = data[0].fullTextAnnotation.text
    console.log(response);
    this.setState({response: response, })
  }).catch( (err) =>{
    console.log(err)
  })

  // fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDpxkjWTEFntmPwlLO1Ka0hBjrj2fukSxA", {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     // "Authorization": "Bearer AIzaSyDpxkjWTEFntmPwlLO1Ka0hBjrj2fukSxA"
  //   },
  //   body: JSON.stringify({
  //     'requests': [
  //       {
  //         'image': {
  //           'source': {
  //             'imageUri': img
  //           }
  //         },
  //         'features': [
  //           {
  //             'type': 'DOCUMENT_TEXT_DETECTION'
  //           }
  //         ]
  //       }
  //     ]
  //   }),
  // }).then(data => console.log('DATA', JSON.stringify(data)));
}

async snap() {
  if (this.camera) {
      let photo = await this.camera.takePictureAsync( {base64: true} );
      let uploadResponse = await this.processText(photo);

    //   fetch("https://www.googleapis.com/upload/storage/v1/b/recieptbucketz/o?uploadType=media&name=test2.jpg", {
    //     method: 'POST',
    //     headers: {
    //       // Accept: 'application/json',
    //       'Content-Type': 'image/jpeg',
    //       "Authorization": "Bearer ya29.Glv4BWMGmNYmDIz8_MwA8JcmWqGJ2aKWJXYNF4anxgPsKskELaDuAlItSdcAqkGUmYyQyci_vUYbmRGSnvYaFzDERssouFzc2ejtrXKpz-u3guXb-eDVbF5jP3C-"
    //     },
    //     body: photo.base64
    // }).then(data =>{
    //   console.log(data);
    // })
  }
}

async uploadImageAsync(photo) {



  // let apiUrl = 'https://www.googleapis.com/upload/storage/v1/b/recieptbucketz/o?uploadType=media&name=test4.jpg';
  //
  // let uriParts = uri.split('.');
  // console.log(uriParts)
  // let fileType = uriParts[uriParts.length - 1];
  //
  // let formData = new FormData();
  // formData.append('photo', {
  //   uri,
  //   name: `photo.${fileType}`,
  //   type: `image/${fileType}`,
  // });
  //
  // let options = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //
  //   },
  //   body: {
  //   requests:[
  //   {
  //   image:{ content: photo.base64 },
  //   features:[
  //   { "type":"TYPE_UNSPECIFIED","maxResults":5 },
  //   {"type":"LANDMARK_DETECTION","maxResults":5},{"type":"FACE_DETECTION","maxResults":5},{"type":"LOGO_DETECTION","maxResults":5},
  //   {"type":"LABEL_DETECTION","maxResults":5},{"type":"TEXT_DETECTION","maxResults":5},{"type":"DOCUMENT_TEXT_DETECTION","maxResults":5},{"type":"SAFE_SEARCH_DETECTION","maxResults":5},{"type":"IMAGE_PROPERTIES","maxResults":5},{"type":"CROP_HINTS","maxResults":5},{"type":"WEB_DETECTION","maxResults":5}],
  // }]}
  //   };
  // };
  //
  // return fetch(apiUrl, options);
}


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.snap();
                  }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}SNAP{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraAccess;
