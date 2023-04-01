//package com.finbudbackend.finbudbackend.config;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.stereotype.Component;
//import org.springframework.util.Assert;
//
//@Component
//class CustomAuthenticationManager implements AuthenticationManager {
//    private AuthenticationManagerBuilder delegateBuilder;
//    private AuthenticationManager delegate;
//    private final Object delegateMonitor = new Object();
//
//    CustomAuthenticationManager(AuthenticationManagerBuilder delegateBuilder) {
//        Assert.notNull(delegateBuilder, "delegateBuilder cannot be null");
//        this.delegateBuilder = delegateBuilder;
//    }
//
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        if (this.delegate != null) {
//            return this.delegate.authenticate(authentication);
//        } else {
//            synchronized(this.delegateMonitor) {
//                if (this.delegate == null) {
//                    this.delegate = (AuthenticationManager)this.delegateBuilder.getObject();
//                    this.delegateBuilder = null;
//                }
//            }
//
//            return this.delegate.authenticate(authentication);
//        }
//    }
//
//    public String toString() {
//        return "AuthenticationManagerDelegator [delegate=" + this.delegate + "]";
//    }
//}
