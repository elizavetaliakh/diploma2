package com.diploma.customs.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebController {
    @RequestMapping(value = "/pieChart", method = RequestMethod.GET)
    public String index() {
        return "pieChart";
    }
}
