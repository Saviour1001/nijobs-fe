import React from "react";
import useToggle from "./useToggle";

function HookWrapper({ initialVal }) {
    const [on, toggle] = useToggle(initialVal);

    return (
        <button onClick={toggle}>
            {on ? "on" : "off"}
        </button>
    );
}

describe("useToggle", () => {
    it("should set init value false", () => {
        const button = shallow(<HookWrapper initialVal={false}/>).find("button").first();
        expect(button.text()).toBe("off");
    });
    it("should set init value true", () => {
        const button = shallow(<HookWrapper initialVal={true}/>).find("button").first();
        expect(button.text()).toBe("on");
    });

    it("should toggle the value", () => {
        const button = mount(<HookWrapper initialVal={false}/>).find("button").first();

        expect(button.text()).toBe("off");
        button.simulate("click");
        expect(button.text()).toBe("on");
    });
});
