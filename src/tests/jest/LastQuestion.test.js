import React from "react";
import renderer from "react-test-renderer";
import LastQuestion from "../../components/layout/slides/LastQuestion";
import SlideQuestion from "../../components/layout/slides/SlideQuestion";

describe("Last question behavior", () => {
  test("If there is no a question", () => {
    const lastQuestion = "";

    const component = renderer.create(
      <LastQuestion lastQuestion={lastQuestion} />
    );
    const tree = component.toJSON();
    expect(tree).toEqual("");
  });

  test("If there is a question", () => {
    const lastQuestion = {
      answered: null,
      asked: "2021-01-28T16:24:47.498Z",
      author: { id: "5f6686aa845cbd520ceb599a", nickname: "Jayne" },
      edited: "false",
      id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
      likes: [
        "5f6686aa75ad25fac6f523e8",
        "5f6686aad7ec91be5633b806",
        "5f6686aa149973deb1774e76",
        "5f6686aa9844ff2a3d95ed50",
        "5f6686aa9625e0d6c94dc89f",
        "5f6686aa70020dce89700680",
        "5f6686aae92b06b1f1b7c69b",
        "5f6686aa8634ff8b9f0ed389",
        "5f6686aa7e7b176a20e3c6ec",
      ],
      text: "777",
    };

    const tree = renderer
      .create(<LastQuestion lastQuestion={lastQuestion} />)
      .toJSON();
    console.log("tree", tree);
    console.log("LastQuestion", <LastQuestion lastQuestion={lastQuestion} />);

    expect(tree).toBeTruthy();
  });
});
