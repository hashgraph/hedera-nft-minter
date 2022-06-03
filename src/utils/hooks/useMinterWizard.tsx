import React, {useState, useMemo, useCallback} from 'react'

export type WizardScreen = {
  step: number,
  Component: React.FC,
}

export default function useMinterWizard(
  steps: WizardScreen[]
) {
  const [step, setStep] = useState(0);

  const isFirstScreen = useMemo(() =>
    step === steps[0].step,
  [step, steps])

  const isLastScreen = useMemo(()=>
    step === steps[steps.length-1].step,
  [step, steps])

  const handleNextButton = useCallback(()=>
    !isLastScreen && setStep(prev => prev + 1),
  [setStep, isLastScreen])

  const handlePrevButton = useCallback(() =>
    !isFirstScreen && setStep(prev => prev - 1),
  [setStep, isFirstScreen])

  const renderMinterWizardScreen = useCallback((step: number) => {
    for(const wizardScreen of steps){
      if(step === wizardScreen.step){
        return <wizardScreen.Component />
      }
    }
    return;
  }, [steps])

  return {
    step,
    isFirstScreen,
    isLastScreen,
    handleNextButton,
    handlePrevButton,
    renderMinterWizardScreen
  }
}

