import { useRef, useState, useEffect } from "react";
import { getBooks } from "../services/book";
export default function Book() {
  useEffect(() => {
    getBooks();
  });
  return "hi";
}
