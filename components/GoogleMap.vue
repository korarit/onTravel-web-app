<template>
    <div style="height:100%; width:100%">
      <LMap
        ref="map"
        :zoom="16"
        :maxZoom="18"
        :center="[location[0], location[1]]"
        :zoomControl="false"
      >
        <LTileLayer
          url="http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
          attribution="&amp;copy; <a href=&quot;https://www.google.com/maps&quot;>Google Map</a> contributors"
          :subdomains="['mt0', 'mt1', 'mt2', 'mt3']"
          :zoomControl="false"
          name="GoogleMap"
        />
        <LMarker :lat-lng="[location[0], location[1]]">
          <LIcon iconUrl="/icon/location-pin.png" :iconSize="[64, 64]" :iconAnchor="[35, 40]"></LIcon>
        </LMarker>
      </LMap>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const zoom = ref(6)

  defineProps({
    location: {
      type: Array
    }
  })
  </script>
  
  <style>
  body {
    margin: 0;
  }
  </style>