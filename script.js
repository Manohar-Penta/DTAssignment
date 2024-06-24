const dataURL = "./ddugky_project.json";
let sideOpen = "./public/sideOpen.png";
let sideClose = "./public/sideClose.png";

function eventAdder() {
  $(".side-button").click(function () {
    $(".side-header h3").toggle(300);
    $(".side-content ul").toggle(300);
    $(".side-content img").toggle(300);
    $(".side-button img").attr("src", function (i, old) {
      return old == sideClose ? sideOpen : sideClose;
    });
  });

  $(".assetDespButton").click(function () {
    $(this).parent().next().slideToggle();
  });
  $(".threadToggle").click(function () {
    $(this).parent().next().slideToggle();
    $(this).attr("src", function (i, old) {
      return old == "./public/Vector.svg"
        ? "./public/Vector2.svg"
        : "./public/Vector.svg";
    });
  });
}

$.getJSON(dataURL, async function (data) {
  let proj = createProject(data);
  document.body.append(proj);
  eventAdder();
});

function createProject(data) {
  let projContainer = document.createElement("div");
  projContainer.classList.add("projContainer");
  projContainer.id = data.tid;

  let projHeader = document.createElement("div");
  projHeader.classList.add("projHeader");
  let projTitle = document.createElement("h2");
  projTitle.classList.add("projTitle");
  projTitle.innerText = data.title;
  let projSubmit = document.createElement("button");
  projSubmit.classList.add("projSubmit");
  projSubmit.innerText = "Submit";
  projHeader.append(projTitle, projSubmit);

  projContainer.append(projHeader);

  data.tasks.map((task) => {
    let htmlTask = createTask(task);
    projContainer.append(htmlTask);
  });

  return projContainer;
}

function createTask({ task_id, task_title, task_description, assets }) {
  $(".side-content ul").append(`<br><strong><li>${task_title}</li></strong><br>`);

  let taskContainer = document.createElement("div");
  taskContainer.classList.add("taskContainer");
  taskContainer.id = task_id;

  let taskHeader = createTaskHeader({ task_description, task_title });
  let taskContent = createTaskContent({ assets });

  taskContainer.append(taskHeader);
  taskContainer.append(taskContent);

  return taskContainer;
}

function createTaskHeader({ task_title, task_description }) {
  let taskHeader = document.createElement("div");
  taskHeader.classList.add("taskHeader");

  let taskTitle = document.createElement("h3");
  taskTitle.classList.add("taskTitle");
  taskTitle.innerText = task_title;

  let taskDescription = document.createElement("span");
  taskDescription.classList.add("taskDescription");
  taskDescription.innerText = task_description;

  taskHeader.append(taskTitle);
  taskHeader.append(taskDescription);

  return taskHeader;
}

function createTaskContent({ assets }) {
  let taskContent = document.createElement("div");
  taskContent.classList.add("taskContent");

  assets.map(
    ({
      asset_id,
      asset_title,
      asset_description,
      asset_content,
      asset_type,
      asset_content_type,
    }) => {
      let assetContainer = createAsset({ asset_id });
      let assetHeader = assetCreateHeader({ asset_title });
      let assetDescription = despCreate({ asset_description });
      let assetContent;

      switch (asset_type) {
        case "display_asset":
          assetContent = displayAsset({ asset_content, asset_content_type });
          break;
        case "input_asset":
          switch (asset_content_type) {
            case "article":
              assetContent = article();
              break;
            case "threadbuilder":
              assetContent = threadBuilder();
              break;
          }
          break;
      }

      assetContainer.append(assetHeader, assetDescription, assetContent);
      taskContent.append(assetContainer);
    }
  );

  return taskContent;
}

function displayAsset({ asset_content, asset_content_type }) {
  let assetContent = document.createElement("div");
  assetContent.classList.add("assetContent");
  assetContent.style.flexGrow = 1;
  assetContent.style.display = "flex";

  let video = document.createElement("iframe");
  video.width = "100%";
  if (asset_content_type == "video") video.height = "290px";
  else {
    video.style.flexGrow = 1;
    video.style.border = "none";
  }
  video.src = asset_content;
  video.style.marginTop = "25px";

  assetContent.append(video);
  return assetContent;
}

function threadBuilder() {
  let threadBuilderContainer = document.createElement("div");
  threadBuilderContainer.innerHTML = `
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem"
    >
      <div style="display: flex; background: #feffc033">
        <img src="./public/Vector.svg" alt="" style="width:1rem;" class="threadToggle"/>
        <span
          style="
            font-family: Open Sans;
            font-size: 20px;
            font-weight: 700;
            line-height: 27.24px;
            text-align: left;
            margin: auto;
          "
          >Thread A</span
        >
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem;">
      <div
        style="
          display: flex;
          gap: 1rem;
          margin: 0;
          padding: 2px;
          justify-content: space-around;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 40%;
            border: 1px solid rgba(128, 128, 128, 0.646);
            border-radius: 10px;
            border-collapse: collapse;
          "
        >
          <p
            style="
              font-family: Open Sans;
              font-size: 12px;
              font-weight: 400;
              line-height: 16.34px;
              text-align: left;
              margin: 3px 2px;
            "
          >
            Sub thread 1
          </p>
          <textarea
            name=""
            id=""
            placeholder="Enter Text Here"
            style="
              border-radius: 10px;
              resize: none;
              border: 1px solid rgba(134, 134, 134, 0.646);
              font-size: 12px;
              padding: 10px;
              margin-bottom: -1px;
              margin-right: -1px;
              margin-left: -1px;
            "
          ></textarea>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 40%;
            border: 1px solid rgba(128, 128, 128, 0.646);
            border-radius: 10px;
          "
        >
          <p
            style="
              font-family: Open Sans;
              font-size: 12px;
              font-weight: 400;
              line-height: 16.34px;
              text-align: left;
              margin: 3px 2px;
            "
          >
            Sub Interpretation 1
          </p>
          <textarea
            name=""
            id=""
            placeholder="Enter Text Here"
            style="
              border-radius: 10px;
              resize: none;
              border: 1px solid rgba(134, 134, 134, 0.646);
              font-size: 12px;
              padding: 10px;
              margin-bottom: -1px;
              margin-right: -1px;
              margin-left: -1px;
            "
          ></textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: end; gap: 0.5rem">
        <img src="./public/Group 1588.svg" alt="" />
        <select
          name=""
          id=""
          style="
            background-color: white;
            padding: 1px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 2px 4px 0px #00000040;
          "
        >
          <option value="" disabled>Select Categ</option>
        </select>
        <select
          name=""
          id=""
          style="
            background-color: white;
            padding: 1px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 2px 4px 0px #00000040;
          "
        >
          <option value="" disabled>Select Proces</option>
        </select>
      </div>

      <button
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background-color: #0029ff;
          border: none;
          border-radius: 10px;
          padding: 5px;
          width: fit-content;
        "
      >
        <span
          style="
            font-family: Roboto;
            font-size: 20px;
            font-weight: 400;
            line-height: 23.44px;
            text-align: left;
            color: white;
          "
          >+</span
        >
        <span
          style="
            font-family: Roboto;
            font-size: 12px;
            font-weight: 500;
            line-height: 14.06px;
            text-align: left;
            color: white;
          "
          >Sub-Thread</span
        >
      </button>
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 100%;
          border: 1px solid rgba(128, 128, 128, 0.646);
          border-radius: 10px;
          border-collapse: collapse;
        "
      >
        <p
          style="
            font-family: Open Sans;
            font-size: 12px;
            font-weight: 400;
            line-height: 16.34px;
            text-align: left;
            margin: 3px 2px;
          "
        >
          Summary for Thread A
        </p>
        <textarea
          name=""
          id=""
          placeholder="Enter Text Here"
          style="
            border-radius: 10px;
            resize: none;
            border: 1px solid rgba(134, 134, 134, 0.646);
            font-size: 12px;
            padding: 15px;
            margin-bottom: -1px;
            margin-right: -1px;
            margin-left: -1px;
          "
        ></textarea>
      </div>
      </div>
    </div>
  `;
  // threadBuilderContainer.style.display = "flex";
  // threadBuilderContainer.style.flexDirection = "column";
  // threadBuilderContainer.style.gap = "0.5rem";

  return threadBuilderContainer;
}

function article() {
  let articleContainer = document.createElement("div");
  articleContainer.classList.add("articleContainer");
  articleContainer.style.display = "flex";
  articleContainer.style.flexDirection = "column";
  articleContainer.style.gap = "0.5rem";
  articleContainer.innerHTML = `<div>
      <span
        style="
          font-family: Open Sans;
          font-size: 20px;
          font-weight: 600;
          line-height: 21.79px;
          letter-spacing: 0.02em;
          text-align: left;
          display: block;
        "
        >Title</span
      >
      <br>
      <input
        type="text"
        style="
          border: none;
          box-shadow: -2px 4px 6px 0px #00000026;
          width: 100%;
          font: 20px;
          padding:0.5rem;
        "
      />
    </div>
    <br>
    <div>
      <span
        style="
          font-family: Open Sans;
          font-size: 20px;
          font-weight: 600;
          line-height: 21.79px;
          letter-spacing: 0.02em;
          text-align: left;
        "
        >Content</span
      >
      <br>
      <br>
      <div
        style="
          border-radius: 5px, 5px, 0px, 0px;
          box-shadow: 0px 2px 10px 0px #0000002e;
        "
      >
        <div style="padding: 10px; box-shadow: 0px 2px 10px 0px #0000002e">
          <ul
            style="
              display: flex;
              gap: 1rem;
              font-family: Poppins;
              font-size: 12px;
              font-weight: 400;
              line-height: 18px;
              list-style-type: none;
              width: 100%;
            "
          >
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Insert</li>
            <li>Format</li>
            <li>Tools</li>
            <li>Table</li>
            <li>Help</li>
          </ul>
          <br>
          <ul style="display: flex; list-style-type: none; gap: 1rem">
            <li><img src="./public/arrow-curve-left-down.svg" alt="undo" /></li>
            <li>
              <img src="./public/arrow-curve-left-right.svg" alt="redo" />
            </li>
            <li><img src="./public/arrow-expand-02.svg" alt="expand" /></li>
            <li><img src="./public/paragraph.svg" alt="paragraph" /></li>
            <li><img src="./public/options2.svg" alt="options" /></li>
          </ul>
        </div>
        <hr style="color: rgb(255, 255, 255); box-shadow: 0 0 5px 0 rgba(152, 152, 152, 0.584)" />
        <textarea
          name=""
          id=""
          rows="10"
          style="resize: none; width: 100%; border: none;padding:10px;"
        ></textarea>
      </div>
    </div>`;

  return articleContainer;
}

function assetCreateHeader({ asset_title }) {
  $(".side-content ul").append(`<li>${asset_title}</li>`);

  let assetHeader = document.createElement("div");
  assetHeader.classList.add("assetHeader");
  let heading = document.createElement("h3");
  heading.innerText = asset_title;
  heading.style.margin = "auto";
  let desButton = document.createElement("button");
  desButton.classList.add("assetDespButton");
  let desImg = document.createElement("img");
  desImg.src = "./public/Group 1735.svg";
  desImg.alt = "Description";
  desButton.append(desImg);
  assetHeader.append(heading);
  assetHeader.append(desButton);

  return assetHeader;
}

function despCreate({ asset_description }) {
  let assetDescription = document.createElement("div");
  assetDescription.classList.add("assetDescription");
  let description = document.createElement("span");
  description.innerHTML = `<strong>Description : </strong>${asset_description}`;
  assetDescription.append(description);

  return assetDescription;
}

function createAsset({ asset_id }) {
  let assetContainer = document.createElement("div");
  assetContainer.classList.add("assetContainer");
  assetContainer.id = asset_id;
  assetContainer.style.display = "flex";
  assetContainer.style.flexDirection = "column";
  return assetContainer;
}
