import useMinterWizard from '@/utils/hooks/useMinterWizard';
import OnChain from '@components/views/minter-wizard/new-collection-new-nft/OnChain';
import OffChain from '@components/views/minter-wizard/new-collection-new-nft/OffChain';
import Advenced from '@components/views/minter-wizard/new-collection-new-nft/Advenced';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/minter-wizard-step-wrapper';

export enum NewCollectionNewNFTWizardSteps {
  OnChainScreen = 0,
  OffChainScreen = 1,
  AdvencedScreen = 2,
}

export default function NewCollectionNewNFT() {
  const {
    step,
    isFirstScreen,
    isLastScreen,
    handleNextButton,
    handlePrevButton,
    renderMinterWizardScreen
  } = useMinterWizard(
    NewCollectionNewNFTWizardSteps.OnChainScreen,
    NewCollectionNewNFTWizardSteps.AdvencedScreen,
    [
      {
        step: NewCollectionNewNFTWizardSteps.OnChainScreen,
        Component: OnChain
      },
      {
        step: NewCollectionNewNFTWizardSteps.OffChainScreen,
        Component: OffChain
      },
      {
        step: NewCollectionNewNFTWizardSteps.AdvencedScreen,
        Component: Advenced
      },
    ]
  )

  return (
    <MinterWizardStepWrapper
      isFirstScreen={isFirstScreen}
      isLastScreen={isLastScreen}
      handlePrevButton={handlePrevButton}
      handleNextButton={handleNextButton}
    >
      {renderMinterWizardScreen(step)}
    </MinterWizardStepWrapper>
  );
}
