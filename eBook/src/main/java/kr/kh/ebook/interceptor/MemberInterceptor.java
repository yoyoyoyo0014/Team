package kr.kh.ebook.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class MemberInterceptor extends HandlerInterceptorAdapter{

	@Override
	public void postHandle(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Object handler, 
			ModelAndView modelAndView)
					throws Exception {
		//구현   
	}
	@Override
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, 
			Object handler)
					throws Exception {
			Object user = request.getSession().getAttribute("user");
			if(user == null) {
				response.sendRedirect(request.getContextPath()+"/");
				return false;
			}
		//구현
		return true;
	}
}