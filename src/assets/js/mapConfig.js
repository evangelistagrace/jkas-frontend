var mapLayers = [
  { label: 'BANDAR TUN RAZAK', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Bandar_Tun_Razak_MIL1/MapServer', center: { y: 3.0911754, x: 101.7161946 } },
  { label: 'BATU', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Batu_MIL1/MapServer', center: { y: 3.1927815, x: 101.6779529 } },
  { label: 'BUKIT BINTANG', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Bukit_Bintang_MIL1/MapServer', center: { y: 3.1443954, x: 101.7029947 } },
  { label: 'CHERAS', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Cheras_MIL1/MapServer', center: { y: 3.1062989, x: 101.7204525 } },
  { label: 'KEPONG', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Kepong_MIL1/MapServer', center: { y: 3.2147088, x: 101.6332636 } },
  { label: 'LEMBAH PANTAI', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Lembah_Pantai_MIL1/MapServer', center: { y: 3.120926, x: 101.654274 } },
  { label: 'SEGAMBUT', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Segambut_MIL1/MapServer', center: { y: 3.1918518, x: 101.6712445 } },
  { label: 'SEPUTEH', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Seputeh_MIL1/MapServer', center: { y: 3.1150039, x: 101.6708962 } },
  { label: 'SETIAWANGSA', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Setiawangsa_MIL1/MapServer', center: { y: 3.1829368, x: 101.7418409 } },
  { label: 'TITIWANGSA', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Titiwangsa_MIL1/MapServer', center: { y: 3.1775967, x: 101.7032149 } },
  { label: 'WANGSA MAJU', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/WangsaMaju_MIL1/MapServer', center: { y: 3.199386, x: 101.7380007 } }
]

var featureLayers = [
  { label: 'BANDAR TUN RAZAK', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Bandar_Tun_Razak_MIL1/FeatureServer', center: { y: 3.0911754, x: 101.7161946 } },
  { label: 'BATU', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Batu_MIL1/FeatureServer', center: { y: 3.1927815, x: 101.6779529 } },
  { label: 'BUKIT BINTANG', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Bukit_Bintang_MIL1/FeatureServer', center: { y: 3.1443954, x: 101.7029947 } },
  { label: 'CHERAS', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Cheras_MIL1/FeatureServer', center: { y: 3.1062989, x: 101.7204525 } },
  { label: 'KEPONG', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Kepong_MIL1/FeatureServer', center: { y: 3.2147088, x: 101.6332636 } },
  { label: 'LEMBAH PANTAI', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Lembah_Pantai_MIL1/FeatureServer', center: { y: 3.120926, x: 101.654274 } },
  { label: 'SEGAMBUT', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Segambut_MIL1/FeatureServer', center: { y: 3.1918518, x: 101.6712445 } },
  { label: 'SEPUTEH', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Seputeh_MIL1/FeatureServer', center: { y: 3.1150039, x: 101.6708962 } },
  { label: 'SETIAWANGSA', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Setiawangsa_MIL1/FeatureServer', center: { y: 3.1829368, x: 101.7418409 } },
  { label: 'TITIWANGSA', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Titiwangsa_MIL1/FeatureServer', center: { y: 3.1775967, x: 101.7032149 } },
  { label: 'WANGSA MAJU', value: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/WangsaMaju_MIL1/FeatureServer', center: { y: 3.199386, x: 101.7380007 } }
]

var cleaningServiceInfo = [
  {
    service: 'Sapuan Jalan', layer: 4, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS PERKHIDMATAN JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' }
    ]
  },
  {
    service: 'Sapuan Siar Kaki', layer: 12, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_CUCIAN ', label: 'KEKERAPAN PEMBERSIHAN CUCIAN' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Pemotongan Rumput', layer: 9, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_POTONG_RU', label: 'KEKERAPAN PEMBERSIHAN POTONG RUMPUT' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Longkang', layer: 5, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_CUCI_LONG', label: 'KEKERAPAN PEMBERSIHAN CUCI LONGKANG' },
      { name: 'LEBAR', label: 'LEBAR' },
      { name: 'SHAPE.STLength()', label: 'PANJANG' }
    ]
  },
  {
    service: 'Pembersihan Jejantas', layer: 8, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'LEBAR', label: 'LEBAR' },
      { name: 'PANJANG', label: 'PANJANG' },
      { name: 'LUAS', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Tandas', layer: 14, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_CUCIAN', label: 'KEKERAPAN PEMBERSIHAN CUCIAN' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Tempat Awam', layer: 6, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Taman Permainan Kanak-kanak', layer: 13, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'KEKERAPAN_PEMBERSIHAN_POTONG_RU ', label: 'KEKERAPAN PEMBERSIHAN POTONG RUMPUT' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Hentian Teksi', layer: 1, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'LUAS', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Hentian Bas', layer: 0, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'LUAS', label: 'LUAS' }
    ]
  },
  {
    service: 'Pembersihan Kawasan Lapang', layer: 10, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'KEKERAPAN_PEMBERSIHAN_POTONG_RU ', label: 'KEKERAPAN PEMBERSIHAN POTONG RUMPUT' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  },
  {
    service: 'Sapuan Parkir Tempat Awam', layer: 11, fields: [
      { name: 'SERVIS_PERKHIDMATAN_JKAS', label: 'SERVIS_PERKHIDMATAN_JKAS' },
      { name: 'KEKERAPAN_PEMBERSIHAN_SAPUAN', label: 'KEKERAPAN PEMBERSIHAN SAPUAN' },
      { name: 'KEKERAPAN_PEMBERSIHAN_POTONG_RU ', label: 'KEKERAPAN PEMBERSIHAN POTONG RUMPUT' },
      { name: 'SHAPE.STArea()', label: 'LUAS' }
    ]
  }
]

var collectionServiceInfo = [{ service: 'Kutipan Isi Rumah / Komersial', layer: 2 }, { service: 'Kutipan Pusat Tong', layer: 3 }]

var assetDir = "/assets/"
// var assetDir = "./assets/"

var printURL = "/assets/html/print.html"

var defaultBaseMap = 'topo-vector'

var baseMapConfig = [
  { value: 'satellite', title: '' },
  { value: 'hybrid', title: '' },
  { value: 'oceans', title: '' },
  { value: 'osm', title: '' },
  { value: 'terrain', title: '' },
  { value: 'dark-gray-vector', title: '' },
  { value: 'gray-vector', title: '' },
  { value: 'streets-vector', title: '' },
  { value: 'streets-night-vector', title: '' },
  { value: 'streets-navigation-vector', title: '' },
  { value: 'topo-vector', title: '' },
  { value: 'streets-relief-vector', title: '' }
]

var parlimenURL = "https://kluo.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/3"


var gassetLayer = [
  { type: 'basemap', name: 'baseMap', url: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Basemap_kl_MIL1/MapServer', label: 'Basemap DBKL' },
  { name: 'dbklborder', url: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Sempadan_WPKL_MIL1/MapServer', label: 'Sempadan WPKL' },
  { name: 'jpph', url: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/1', label: 'JPPH Lot' },
  { name: 'jupem', url: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/0', label: 'LOT JUPEM 2015' },
  { name: 'housing', url: 'https://kluo.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/2', label: 'Kawasan Perumahan /Taman' }
]
