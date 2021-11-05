console.log('关于我们');
var map = new BMapGL.Map("containers");
map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);