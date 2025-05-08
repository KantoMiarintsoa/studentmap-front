export type Graph = {
    labels: string[]
    datasets: {
        label: string,
        borderColor: string
        tension: number
        data: number[]
    }[]
}