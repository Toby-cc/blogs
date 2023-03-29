<template>
  <svg style="display: none;">
    <defs>
      <!-- 横向效果 -->
      <filter id="fe1">
        <feTurbulence id="animation" type="fractalNoise" baseFrequency="0.00001 9.9999999" numOctaves="1" result="warp">
          <animate attributeName="baseFrequency" from="0.00001 9.9999" to="0.00001 0.001" dur="2s" repeatCount="indefinite"/>
        </feTurbulence>
        <feOffset dx="-90" dy="-90" result="warpOffset"></feOffset>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset"></feDisplacementMap>
      </filter>
      <!-- 纵向效果 -->
      <filter id="fe2">
        <feTurbulence id="animation" type="fractalNoise" baseFrequency="9.9999999 0.00001" numOctaves="1" result="warp">
          <animate attributeName="baseFrequency" from="9.9999999 0.00001" to="0.009 0.00001" dur="2s" repeatCount="indefinite"/>
        </feTurbulence>
        <feOffset dx="-90" dy="-90" result="warpOffset"></feOffset>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset"></feDisplacementMap>
      </filter>
    </defs>
  </svg>
</template>