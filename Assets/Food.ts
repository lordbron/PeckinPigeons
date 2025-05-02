import { Interactable } from "./SpectaclesSyncKit/SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { SIK } from "./SpectaclesSyncKit/SpectaclesInteractionKit/SIK";

@component
export class Food extends BaseScriptComponent {
    private body: BodyComponent | null = null;
    private interactable: Interactable | null = null;
    private rightHand = SIK.HandInputData.getHand("right");

    onAwake() {
        this.interactable = this.getSceneObject().getComponent(
            Interactable.getTypeName(),
        )
        this.body = this.getSceneObject().getComponent(
            "Physics.BodyComponent",
        )
        this.createEvent("UpdateEvent").bind(this.update.bind(this));
        this.createEvent("OnStartEvent").bind(() => {
            print("onStart");
            if (!this.interactable) {
                throw new Error(
                    "Text Interactable requires an Interactable Component on the same Scene object in order to work - please ensure one is added.",
                )
            }
            this.interactable.onTriggerEnd.add(() => {
                if (this.enabled) {
                    if (!this.rhIsEating()) {
                        this.body.dynamic = true;
                    }
                }
            })
    
        })

    }
    rhIsEating() {
        return this.rightHand.isFacingCamera() && this.rightHand.getPalmPitchAngle() > 30.0 && this.rightHand.getPalmPitchAngle() < 100.0;
    }
    checkForGestures() {

    }
    update() {
        var mouthAngle = this.rightHand.wrist.position.angleTo(this.rightHand.indexTip.position)
        print("palm pitch: " + mouthAngle);
    }

}
