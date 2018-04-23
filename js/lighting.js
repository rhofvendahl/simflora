function Lighting() {
  var sunDirectional = new THREE.DirectionalLight( 0xfffed3, 1, 100, 2 );
  sunDirectional.castShadow = true;
  sunDirectional.position.set( 0, 1.2, 0 );
  var texture = new THREE.TextureLoader().load( "https://i.imgur.com/LplOZKW.png" );
  var flareColor = new THREE.Color( 0xffffff );
  var lensFlare = new THREE.LensFlare( texture, 140, 0.0, THREE.AdditiveBlending, flareColor);
  sunDirectional.add(lensFlare);

  this.innerPlane = new THREE.Group();
  this.innerPlane.add(sunDirectional);
  this.outerPlane = new THREE.Group();
  this.outerPlane.add(this.innerPlane);

  this.ambientNeutral = new THREE.AmbientLight(0x606060);
  this.ambientWinter = new THREE.AmbientLight( 0xb9c5eb, 0.05, 100, 2);
  this.ambientSummer = new THREE.AmbientLight( 0xffd505, 0.1, 100, 2 );

  this.group = new THREE.Group();
  this.group.add(this.outerPlane);
  this.group.add(this.ambientNeutral);
  this.group.add(this.ambientWinter);
  this.group.add(this.ambientSummer);

  this.update = function(time) {
    this.innerPlane.rotation.x = time.dayRad;
    this.outerPlane.rotation.z = 0.384 - 0.384 * Math.sin(time.seasonRad);

    this.ambientNeutral.intensity = Math.abs(Math.cos(time.dayRad))*0.6 + 1.4;
    this.ambientWinter.intensity = -Math.sin(time.seasonRad)*0.4;
    this.ambientSummer.intensity = Math.sin(time.seasonRad)*0.8;
  };
}
