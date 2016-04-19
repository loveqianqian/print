package com.myloverqian.print.util;

import org.apache.commons.lang.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by zhiwei on 2016/4/15.
 */
public class CommonUtils extends StringUtils {

    /**
     * 获得当前时间
     *
     * @param f
     * @return
     */
    public static String getDateCurrent(String f) {
        SimpleDateFormat sdf = new SimpleDateFormat(f);
        String format = sdf.format(new Date());
        return format;
    }

    public static boolean isEqual(Object first, Object second, String message) {

        if (first instanceof Integer && second instanceof Integer) {
            if (first != second) {
                throw new IllegalArgumentException(message);
            } else {
                return true;
            }
        } else if (first instanceof String && second instanceof String) {
            if (!first.equals(second)) {
                throw new IllegalArgumentException(message);
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public static boolean isNull(Object object) {
        return !isNotNull(object);
    }

    public static boolean isNotNull(Object object) {
        return object != null && !object.equals("null");
    }

    public static boolean isListNotEmpty(List list) {
        return list != null && !list.isEmpty() && list.size() > 0;
    }

    public static boolean isListEmpty(List list) {
        return !isListNotEmpty(list);
    }
}
