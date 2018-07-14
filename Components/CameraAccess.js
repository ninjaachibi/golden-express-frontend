import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

// var gcloud = require('gcloud')({
//   keyFilename: '../env.js',
//   projectId: 'carbide-kayak-210203'
// });

// // var datastore = require('@google-cloud/datastore');
// var vision = require('@google-cloud/vision');
// // var visionClient = vision({
// //   keyFilename: '../env.js',
// //   projectId: 'carbide-kayak-210203'
// // });
// const client = new vision.ImageAnnotatorClient();
//
// // Performs label detection on the image file
// client
//   .labelDetection('./resources/wakeupcat.jpg')
//   .then(results => {
//     const labels = results[0].labelAnnotations;
//
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// var gcloud = require('@google-cloud/vision')({
//   keyFilename: './keyFile.json',
//   projectId: 'carbide-kayak-210203'
// });
// var vision = gcloud.vision();

// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');


// var vision = gcloud.vision();

class CameraAccess extends React.Component {
  static navigationOptions = {
    title: 'Camera'
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
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
  // Creates a client
  // const client = new vision.ImageAnnotatorClient();
  //
  // /**
  //  * TODO(developer): Uncomment the following line before running the sample.
  //  */
  // // const fileName = 'Local image file, e.g. /path/to/image.png';
  //
  // // Read a local image as a text document
  // client
  //   .documentTextDetection(img)
  //   .then(results => {
  //     const fullTextAnnotation = results[0].fullTextAnnotation;
  //     console.log('annotation!', fullTextAnnotation.text);
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });
  fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDpxkjWTEFntmPwlLO1Ka0hBjrj2fukSxA", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // "Authorization": "Bearer AIzaSyDpxkjWTEFntmPwlLO1Ka0hBjrj2fukSxA"
    },
    body: JSON.stringify({
      'requests': [
        {
          'image': {
            'source': {
              'imageUri': img
            }
          },
          'features': [
            {
              'type': 'DOCUMENT_TEXT_DETECTION'
            }
          ]
        }
      ]
    }),
  }).then(data => console.log('DATA', JSON.stringify(data)));
}

async snap() {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync();
    // vision.detectText(photo.uri, (err, text, apiResponse) => {
    //     console.log(text);
    //   });
    // };
    console.log(photo)
    // this.processText(photo.uri)
  }
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
