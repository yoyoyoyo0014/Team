package kr.kh.ebook.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

@Aspect
@Component
@EnableAspectJAutoProxy
public class ExecutionTimer {

		@Pointcut("execution(* kr.kh.boot.service..*(..))")
    private void timer(){};
    
    //timer()는 위에서 생성한 메서드
    @Around("timer()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis(); // 메서드 실행 전 시간 기록

        Object proceed = joinPoint.proceed(); // 메서드 실행

        long executionTime = System.currentTimeMillis() - startTime; // 메서드 실행 후 시간 차이 계산

        System.out.println(joinPoint.getSignature() + " 실행시간 :  " + executionTime + "ms");

        return proceed; // 원래 메서드의 리턴 값을 그대로 반환. return이 없거나 null이면 에러 발생
    }
}