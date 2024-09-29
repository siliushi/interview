const [healthData, setHealthData] = useState<ThresholdParams>();
const [riskData, setRiskData] = useState<ThresholdParams>();
useAsyncEffect(async () => {
    const resHealth = await api.threshold.getThreshold({type: 0});
    const resRisk = await api.threshold.getThreshold({type: 1});
    setHealthData(resHealth);
    setRiskData(resRisk);
}, [])
const onchange = (e:React.ChangeEvent<HTMLInputElement>, data: ThresholdParams, key: keyof ThresholdParams) => {
    data[key] = +e.target.value;
}
const onClose = async () => {
    if(healthData) await api.threshold.setThreshold(healthData)
    if(riskData) await api.threshold.setThreshold(riskData)
}