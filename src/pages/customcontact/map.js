const AK = "PEigLtGfNhtozaeK0uTtOG6OYWBS1MGu";
const SCRIPT_ID = "mapSdk";

export default () => {
  return new Promise(resolve => {
    const mapSdk = document.getElementById(SCRIPT_ID);
    if (!mapSdk) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${AK}&callback=mapInitialize`;
      window.mapInitialize = function () {
        resolve(window.BMap);
      };
      document.body.appendChild(script);
    } else {
      resolve(window.BMap);
    }
  });
};
