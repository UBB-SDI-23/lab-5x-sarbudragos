package com.example.sdilab1.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class Code {
    private Integer code;
    private Date expirationDate;
}
