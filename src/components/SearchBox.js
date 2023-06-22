// import React, { useState } from "react";

// /* REACT BOOTSTRAP */
// import { Button, Form } from "react-bootstrap";

// /* REACT ROUTER DOM */
// import { useNavigate} from "react-router-dom";

// function SearchBox() {
//   /* STATE */
//   const [keyword, setKeyword] = useState("");

//   let navigate =
//     useNavigate(); /* CAN'T DIRECTLY USE HISTORY AS IT'S NOT AN ACTUAL PAGE SO CAN'T DESTRUCTURE PROPS */

//   /* HANDLER */
//   const submitHandler = (e) => {
//     e.preventDefault();

//     // WHEN USER HITS SUBMIT, REDIRECT TO HOME PAGE TO SEE PRODUCTS AND APPEND ?keyword=...IN URL
//     if (keyword) {
//       navigate(`/?keyword=${keyword}&page=1`);
//     } else {
//       // IF WE HIT SUBMIT WITHOUT KEYWORD, WE DON'T WANT THE USER TO GET REDIRECTED IN THAT CASE RATHER STAY ON WHATEVER PAGE HE WAS
//       navigate(navigate.location.pathname);
//     }
//   };

//   return (
//     <Form onSubmit={submitHandler} className="d-flex">
//       <Form.Control
//         type="text"
//         name="q"
//         onChange={(e) => setKeyword(e.target.value)}
//         className="mr-sm-2 ml-sm-5"
//       ></Form.Control>

//       <Button type="submit" variant="outline-success" className="p-2 mx-sm-2">
//         Search
//       </Button>
//     </Form>
//   );
// }

// export default SearchBox;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const { keyword: currentKeyword } = useParams();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(`/${currentKeyword}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      />

      <Button type="submit" variant="outline-success" className="p-2 mx-sm-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
