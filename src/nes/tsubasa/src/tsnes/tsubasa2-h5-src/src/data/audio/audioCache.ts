//对应音频地址，缓存音频数据，由音频引擎（可能是bank12由进行什么特殊处理，因为apu是不变的）处理并交给apu生成-由webaudio连接管道
export const audioCache = new Map<string, ArrayBuffer>();