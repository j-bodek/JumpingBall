export default{
    counter(state){
        if (String(state.counter).length == 1){
            return '0' + String(state.counter)
        }
        return state.counter
    }
}