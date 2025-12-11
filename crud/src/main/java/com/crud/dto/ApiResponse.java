package com.crud.dto;
import java.util.Map;

public class ApiResponse {
    private Map<String, String> Meta;
    private Object Data;

    public ApiResponse(Map<String, String> meta, Object data) {
        this.Meta = meta;
        this.Data = data;
    }

    public Map<String, String> getMeta() { return Meta; };
    public Object getData() { return Data; }
}
