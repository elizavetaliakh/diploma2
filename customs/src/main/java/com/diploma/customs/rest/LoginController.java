package com.diploma.customs.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping("login")
    public String loginPage() {
        return "authorization";
    }

    @GetMapping("index")
    public String index() {
        return "dbstructure";
    }
}
