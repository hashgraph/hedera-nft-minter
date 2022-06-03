import React, {useState, useMemo, useCallback} from 'react'

type WizardScreen = {
  step: number,
  Component: React.FC,
}

export default function useMinterWizard(
  firstStep: number,
  lastStep: number,
  wizardScreens: WizardScreen[]
) {
  const [step, setStep] = useState(0);

  const isFirstScreen = useMemo(() => step === firstStep, [step, firstStep])
  const isLastScreen = useMemo(()=> step === lastStep, [step, lastStep])

  const handleNextButton = useCallback(
    ()=>
      !isLastScreen && setStep(prev => prev + 1),
    [setStep, isLastScreen]
  )

  const handlePrevButton = useCallback(
    () =>
      !isFirstScreen && setStep(prev => prev - 1),
    [setStep, isFirstScreen]
  )

  const renderMinterWizardScreen = useCallback((step: number) => {
    for(const wizardScreen of wizardScreens){
      if(step === wizardScreen.step){
        return <wizardScreen.Component />
      }
    }
    return;
  }, [wizardScreens])

  return {
    step,
    isFirstScreen,
    isLastScreen,
    handleNextButton,
    handlePrevButton,
    renderMinterWizardScreen
  }
}

