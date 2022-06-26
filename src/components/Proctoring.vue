<template>
    <video
        class="size"
        autoPlay
        playsInline
        muted
        ref="videoRef"
        width="500"
        height="300"
    />
</template>

<script>
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

export default({
    name: 'Proctoring',
    data(){
        return{}
    },
    mounted(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            const webCamPromise = navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: "user",
                    width: 500,
                    height: 300
                }
            })
            .then(stream => {
                window.stream = stream
                this.$refs.videoRef.srcObject = stream
                return new Promise((resolve, reject) => {
                    this.$refs.videoRef.onloadedmetadata = () => {
                        resolve()
                    }
                })
            })

            const modelPromise = cocoSsd.load()

            Promise.all([modelPromise, webCamPromise])
            .then(values => {
                setInterval(this.detectFrame, 500, this.$refs.videoRef, values[0])
            })
            .catch(error => {
                console.error(error)
            })
        }
    },
    methods: {
        detectFrame(video, model){
            model.detect(video).then(predictions => {
                this.$emit('predictions', predictions)
            }).catch(e => {
                console.log(e)
            })
        },
    },
})
</script>

<style>

.size{
    position: absolute;
    top: 0;
    left: 0;
    display: none;
}

</style>