<template>
  <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
  <!-- Todo: add easing -->
  <div
    v-show="loading"
    class="va-popup__loading"
  >
    <svg
      width="100"
      height="100"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="#41b883"
    >
      <g
        fill="41b883"
        fill-rule="evenodd"
      >
        <g
          transform="translate(1 1)"
          stroke-width="2"
        >
          <circle
            cx="5"
            cy="50"
            r="5"
          >
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;5;50;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              values="5;27;49;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="27"
            cy="5"
            r="5"
          >
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              from="5"
              to="5"
              values="5;50;50;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              from="27"
              to="27"
              values="27;49;5;27"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="49"
            cy="50"
            r="5"
          >
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;50;5;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              from="49"
              to="49"
              begin="0s"
              dur="2.2s"
              values="49;5;27;49"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PopupLoading',

  disableAxeAudit: true
}
</script>

<style scoped>
.va-popup__loading {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .8);
}
</style>
