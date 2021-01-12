

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const Listener = (setter) => {
    function handleResize() {
        setter(getWindowDimensions());
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}

export const IsSmallViewport = (windowDimension) => {
    return windowDimension.width <= 375;
} 

export default Listener;