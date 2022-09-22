const PROXY_CONFIG = [
  {
    context: ['/api/howell/ver10/aiop_service/struct_service/'],
    target: 'http://192.168.21.122:9123',
    // target: 'http://192.168.21.241:9000',
    changeOrigin: true,
    secure: false,
  },
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/video/wsplayer/',
      '/amap/',
      '/map/',
    ],
    target: 'http://192.168.21.241:9000',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
