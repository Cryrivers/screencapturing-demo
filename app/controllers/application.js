import Ember from 'ember';
const { desktopCapturer }  = requireNode('electron');

export default Ember.Controller.extend({
  _sources: [],
  _sharingURL: '',
  prepareSharing(sourceId) {
    navigator.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    }, (stream) => {
      this.set('_sharingURL', URL.createObjectURL(stream));
    }, (error) => {
      console.log(error);
    });
  },
  init() {
    desktopCapturer.getSources({
      types: ['window', 'screen']
    }, (error, sources) => {
      this.set('_sources', sources);
    });
  }
});
