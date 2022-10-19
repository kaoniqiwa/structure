const PROXY_CONFIG = [
  {
    context: [
      '/api/howell/ver10/aiop_service/struct_service/',
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
    ],
    // target: 'http://192.168.21.122:8080',
    // target: 'http://192.168.21.241:9000',
    target: 'http://192.168.18.59',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/amap/', '/map/'],
    target: 'http://192.168.21.241:9000',
    // target: 'http://192.168.18.59',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/video/wsplayer/'],
    target: 'http://192.168.21.241:8800',
    // target: 'http://192.168.18.59',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
